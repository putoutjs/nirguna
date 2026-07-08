import {isNext} from '#is';

export const VariableDeclaration = (path, {print, traverse, maybe}) => {
    const [declarator] = path.get('declarations');
    const {id} = declarator.node;
    const typeName = id.typeAnnotation.typeAnnotation.typeName.name;
    const isMut = path.node.kind !== 'const';
    
    print('(global $');
    print(id.name);
    
    if (path.parentPath.isExportNamedDeclaration()) {
        print(' (export "');
        print(id.name);
        print('")');
    }
    
    print(' ');
    
    if (isMut) {
        print('(mut ');
        print(typeName);
        print(')');
    } else {
        print(typeName);
    }
    
    print(' ');
    traverse(declarator.get('init'));
    print(')');
    maybe.write.breakline(isNext(path));
};

