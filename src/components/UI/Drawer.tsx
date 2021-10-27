import { Drawer  } from 'antd';

const DrawerWrapper = (children:ChildNode,props: any) => {
    return (
        <Drawer {...props}>
            {children}
        </Drawer>
    )
}

export default DrawerWrapper
