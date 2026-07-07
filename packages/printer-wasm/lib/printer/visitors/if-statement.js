import {types} from '@putout/babel';
import {exists} from '@putout/printer/is';

const {isReturnStatement} = types;

export const IfStatement = (path, {indent, print, maybe, write, traverse}) => {
    const {parentPath} = path;
    const partOfAlternate = parentPath.get('alternate');
    
    if (path !== partOfAlternate)
        indent();
    
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
    
    const consequent = path.get('consequent');
    const alternate = path.get('alternate');
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
