let dom = (
    <div style="border: 1px solid red;">
        <div>test</div>
        <img
            src="https://daihaoxin.github.io/about/index/program2.jpg"
            style="width: 400px;" />
    </div>
);

function vnode(type, props, ...children) {
    return { type, props, children };
}

