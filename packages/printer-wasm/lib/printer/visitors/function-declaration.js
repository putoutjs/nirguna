import {isNext, isNextParent} from '@putout/printer/is';
import {createTypeChecker} from '@putout/printer/type-checker';
import {types} from '@putout/babel';
import {printParams} from '../params.js';

const {isTSTupleType} = types;

const isInsideBlockLike = createTypeChecker([
    '+: parentPath.parentPath -> TSModuleBlock',
    '-: parentPath -> !BlockStatement',
]);

export const FunctionDeclaration = {
    print(path, printer, semantics) {
        const {
            print,
            write,
            traverse,
        } = printer;
        
        const {
            generator,
            returnType,
            leadingComments,
        } = path.node;
        
        if (leadingComments)
            for (const comment of leadingComments) {
                write(';; ');
                write(comment.value.trimStart());
                write.breakline();
            }
        
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
        }
        
        printParams(path, printer, semantics, {
            braceOpen: '(param ',
            leadingSpace: true,
        });
        
        if (returnType) {
            print.space();
            print('(');
            print('result ');
            
            const returnTypeAnnotation = path.get('returnType').get('typeAnnotation');
            
            if (isTSTupleType(returnTypeAnnotation)) {
                const elementTypes = returnTypeAnnotation.get('elementTypes');
                const n = elementTypes.length - 1;
                
                for (const [i, elementType] of elementTypes.entries()) {
                    traverse(elementType);
                    
                    if (i < n)
                        print.space();
                }
            } else {
                print('__returnType');
            }
            
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
