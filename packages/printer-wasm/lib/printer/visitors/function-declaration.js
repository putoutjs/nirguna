import {isNext, isNextParent} from '@putout/printer/is';
import {createTypeChecker} from '@putout/printer/type-checker';
import {printParams} from '../params.js';

const isInsideBlockLike = createTypeChecker([
    '+: parentPath.parentPath -> TSModuleBlock',
    '-: parentPath -> !BlockStatement',
]);

export const FunctionDeclaration = {
    print(path, printer, semantics) {
        const {print} = printer;
        const {generator, returnType} = path.node;
        
        print('(');
        print('func');
        
        if (!generator)
            print(' ');
        
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
    afterSatisfy: () => [isNext, isNextParent, isInsideBlockLike],
    after(path, {write}) {
        write.breakline();
    },
};
