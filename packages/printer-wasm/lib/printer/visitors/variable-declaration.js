export const VariableDeclaration = (path, printer) => {
    const {
        print,
        traverse,
        write,
    } = printer;
    
    const [declarator] = path.get('declarations');
    const {id} = declarator.node;
    const typeName = id.typeAnnotation.typeAnnotation.typeName.name;
    const isMut = path.node.kind !== 'const';
    
    print('(global $');
    print(id.name);
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
    write.breakline();
};
