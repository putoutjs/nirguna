import {types} from '@putout/babel';
import {isNext, isNextParent} from '@putout/printer/is';
import {printParams} from '../params.js';

const {
    isAssignmentExpression,
    isTSModuleBlock,
    isBlockStatement,
    isExpressionStatement,
    isFunctionDeclaration,
} = types;

export const FunctionDeclaration = {
    print(path, printer, semantics) {
        const {print} = printer;
        const {generator, returnType} = path.node;
        
        print('(');
        print('func');
        
        if (!generator) {
            print(' ');
        } else {
            print('*');
            print.space();
        }
        
        print('$');
        print('__id');
        
        if (path.parentPath.isExportNamedDeclaration()) {
            print(' ');
            print('(');
            print('export ');
            print('"');
            print('__id');
            print('"');
            print(')');
            print(' ');
        }
        
        printParams(path, printer, semantics, {
            braceOpen: '(param ',
        });
        
        if (returnType) {
            print.space();
            print('(');
            print('result ');
            print('__returnType');
            print(')');
        }
        
        print('__body');
        print(')');
    },
    afterSatisfy: () => [isNext, isNextParent, isInsideBlockStatement],
    after(path, {indent, write}) {
        if (isNextAssign(path) || isNextFunction(path) || isNext(path))
            indent();
        
        write.breakline();
        //maybe.write.newline(notInsideExportDefaultWithBody(path));
    },
};

const isNextFunction = (path) => {
    const next = path.getNextSibling();
    return isFunctionDeclaration(next);
};

const isNextAssign = (path) => {
    const next = path.getNextSibling();
    
    if (!isExpressionStatement(next))
        return false;
    
    return isAssignmentExpression(next.node.expression);
};

function isInsideBlockStatement(path) {
    const {parentPath} = path;
    
    if (isTSModuleBlock(parentPath.parentPath))
        return true;
    
    if (!isBlockStatement(parentPath))
        return false;
    
    return !path.node.body.body.length;
}
