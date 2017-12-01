export default function importSpecifierTransform (file, api, options) {
  const { jscodeshift } = api
  const parse = jscodeshift
  const { assignmentExpression } = jscodeshift
  const { source } = file

  const root = parse(source)

  try {
    getModuleExportsAssignmentsWithIffe(root, jscodeshift)
      .forEach((path) => {
        const body = getImmediatelyInvokingFunctionExceptReturnStatement(path.value.right, jscodeshift)
        parse(path.parentPath)
          .insertBefore(body)
      })

    getModuleExportsAssignmentsWithIffe(root, jscodeshift)
      .replaceWith(path => {
        const returnStatement = getImmediatelyInvokingFunctionReturnStatement(path.value.right, jscodeshift)
        const newAssign = assignmentExpression('=', path.value.left, returnStatement.argument)
        return newAssign
      })
  } catch (e) {
    console.warn(e)
    return // Opt out of transform
  }

  return root.toSource(options.printOptions)
}

function getModuleExportsAssignmentsWithIffe (root, jscodeshift) {
  const { AssignmentExpression } = jscodeshift
  return root
    .find(AssignmentExpression, {
      operator: '=',
      left: {
        object: { name: 'module' },
        property: { name: 'exports' }
      },
      right: {
        type: 'CallExpression'
      }
    })
}

function getImmediatelyInvokingFunctionReturnStatement (iffe, jscodeshift) {
  const parse = jscodeshift
  const { ReturnStatement } = jscodeshift

  const functionExpression = iffe.callee
  const functionBody = functionExpression.body.body
  const returnStatements = functionBody
    .filter((path) => {
      return parse(path).isOfType(ReturnStatement)
    })
  if (returnStatements.length > 1) {
    throw new Error('Found multiple return statements')
  }
  return returnStatements[0]
}

function getImmediatelyInvokingFunctionExceptReturnStatement (iffe, jscodeshift) {
  const parse = jscodeshift
  const { ReturnStatement } = jscodeshift

  const functionExpression = iffe.callee
  const functionBody = functionExpression.body.body
  const functionBodySansReturn = functionBody
    .filter((path) => {
      return !parse(path).isOfType(ReturnStatement)
    })
  return functionBodySansReturn
}