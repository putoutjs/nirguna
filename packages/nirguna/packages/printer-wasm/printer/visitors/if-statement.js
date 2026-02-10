import {types} from '@putout/babel';
import {exists, isInsideIf} from '@putout/printer/is';

const {
    isBlockStatement,
    isFunctionDeclaration,
    isStatement,
    isReturnStatement,
} = types;

const isTopLevel = ({parentPath}) => parentPath.parentPath.isProgram();

const isInsideNestedBody = ({parentPath}) => {
    if (parentPath.type !== 'BlockStatement')
        return false;
    
    return parentPath.parentPath.type === 'BlockStatement';
};

const isEmptyBody = (path) => !path.node.body.length;

const isLastEmptyInsideBody = (path) => {
    const {parentPath} = path;
    
    if (!isBlockStatement(parentPath))
        return false;
    
    if (!isBlockStatement(path.node.consequent))
        return false;
    
    if (path.node.consequent.body.length)
        return false;
    
    return isFunctionDeclaration(path.parentPath.parentPath);
};

export const IfStatement = (path, {indent, print, maybe, write, traverse}) => {
    const {parentPath} = path;
    const partOfAlternate = parentPath.get('alternate');
    
    if (path !== partOfAlternate)
        indent();
    
    print('(if');
    
    if (path.node.test.typeArguments) {
        print.space();
        print('(result ');
        print(path.get('test.typeArguments.params.0.typeName'));
        print(')');
    }
    
    indent.inc();
    print.breakline();
    
    print('__test');
    print.breakline();
    print('(then');
    
    const consequent = path.get('consequent');
    const alternate = path.get('alternate');
    const isConsequentBlock = consequent.isBlockStatement();
    const isVar = consequent.isVariableDeclaration();
    
    if (isConsequentBlock) {
        print.space();
        print(consequent);
        
        if (isInsideIf(path.parentPath) || isInsideNestedBody(path))
            maybe.print.newline(isEmptyBody(consequent));
    } else {
        const isRet = isReturnStatement(consequent);
        print.newline();
        indent.inc();
        maybe.indent(!isRet);
        print(consequent);
        indent.dec();
        maybe.print.newline(!isRet);
    }
    
    indent();
    print(')');
    print.newline();
    
    if (alternate.isBlockStatement()) {
        write.space();
        write('(else');
        write.space();
        traverse(alternate);
    } else if (alternate.isIfStatement()) {
        if (alternate.get('consequent').isBlockStatement())
            write.space();
        else
            indent();
        
        write('(else ');
        traverse(alternate);
    } else if (exists(alternate)) {
        maybe.write.newline(isVar);
        maybe.indent(!isConsequentBlock);
        maybe.write.space(isConsequentBlock);
        write('(else');
        write.splitter();
        indent.inc();
        
        const isRet = isReturnStatement(alternate);
        maybe.indent(!isRet);
        traverse(alternate);
        maybe.write.newline(!isRet);
        indent.dec();
        indent();
        write(')');
        write.newline();
    }
    
    const nextPath = path.parentPath.getNextSibling();
    
    if (path === partOfAlternate && !isTopLevel(path) && !isStatement(nextPath))
        print.newline();
    
    if (isLastEmptyInsideBody(path))
        print.newline();
    
    indent.dec();
    indent();
    print(')');
    print.newline();
};
