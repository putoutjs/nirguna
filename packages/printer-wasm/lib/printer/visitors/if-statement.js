import {types} from '@putout/babel';
import {exists} from '@putout/printer/is';

const {isReturnStatement, isBreakStatement, isContinueStatement} = types;

export const IfStatement = (path, {indent, print, maybe, write, traverse}) => {
    const {parentPath} = path;
    const partOfAlternate = parentPath.get('alternate');
    
    if (path !== partOfAlternate)
        indent();
    
    const consequent = path.get('consequent');
    const alternate = path.get('alternate');
    const hasNoAlternate = !exists(alternate);
    
    const isBrIf = consequent.isBlockStatement() && consequent.node.body.length === 1 && (isBreakStatement(consequent.node.body[0]) || isContinueStatement(consequent.node.body[0])) && hasNoAlternate;
    
    if (isBrIf) {
        const jump = consequent.node.body[0];
        
        write('(');
        write('br_if');
        write(' $');
        write(jump.label.name);
        write(' ');
        print('__test');
        write(')');
        write.newline();
        return;
    }
    
    print('(if');
    
    if (path.node.test.typeArguments) {
        print.space();
        print('(result ');
        print('__test.typeArguments.params.0.typeName');
        print(')');
    }
    
    indent.inc();
    print.breakline();
    
    print('__test');
    print.breakline();
    print('(then');
    
    const isConsequentBlock = consequent.isBlockStatement();
    const isVar = consequent.isVariableDeclaration();
    
    if (!isConsequentBlock) {
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
    
    if (exists(alternate)) {
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
    
    indent.dec();
    indent();
    print(')');
    print.newline();
};
