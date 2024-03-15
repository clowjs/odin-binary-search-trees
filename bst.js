class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array.length) return null;

    array.sort((a, b) => a - b);

    let mid = Math.floor(array.length / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }  
  }

  insert(data) {
    const newNode = new Node(data);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;

    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  deleteItem(data, root = this.root) {
    if (!root) return root;

    if (data < root.data) {
      root.left = this.deleteItem(data, root.left);
    } else if (data > root.data) {
      root.right = this.deleteItem(data, root.right);
    } else {
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      root.data = this.minValue(root.right);
      root.right = this.deleteItem(root.data, root.right);
    }

    return root;
  }

  minValue(node) {
    let current = node;

    while (current.left) {
      current = current.left;
    }

    return current.data;
  }

  find(value) {
    let current = this.root;

    while (current) {
      if (value === current.data) {
        return current;
      }

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  levelOrder(callback = null) {
    let queue = [this.root];
    let values = [];

    while (queue.length) {
      let node = queue.shift();

      if (callback) {
        callback(node);
      } else {
        values.push(node.data);
      }

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    if (values.length) return values;
  }

  inOrder(callback = null) {
    let values = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (callback) {
        callback(node);
      } else {
        values.push(node.data);
      }
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    if (values.length) return values;
  }

  preOrder(callback = null) {
    let values = [];

    function traverse(node) {
      if (callback) {
        callback(node);
      } else {
        values.push(node.data);
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    if (values.length) return values;
  }

  postOrder(callback = null) {
    let values = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      if (callback) {
        callback(node);
      } else {
        values.push(node.data);
      }
    }

    traverse(this.root);

    if (values.length) return values;
  }

  height(node = this.root) {
    if (!node) return -1;

    let left = this.height(node.left);
    let right = this.height(node.right);

    return Math.max(left, right) + 1;
  
  }

  depth(node) {
    if (node === this.root) return 0;

    let current = this.root;
    let depth = 0;

    while (current) {
      if (node.data === current.data) {
        return depth;
      }

      if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }

      depth++;
    }
  }

  isBalanced() {
    let left = this.height(this.root.left);
    let right = this.height(this.root.right);

    return Math.abs(left - right) <= 1;
  
  }

  rebalance() {
    let values = this.inOrder();
    this.root = this.buildTree(values);
  }

  
}

function randomArray(size = 10, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const array = randomArray();
console.log(array);

const tree = new Tree(array);
tree.prettyPrint();

console.log(`Is balanced: ${tree.isBalanced()}`);
console.log(`Elements in level order: ${tree.levelOrder()}`);
console.log(`Elements in pre-order: ${tree.preOrder()}`);
console.log(`Elements in post-order: ${tree.postOrder()}`);
console.log(`Elements in in-order: ${tree.inOrder()}`);

tree.insert(101);
tree.insert(102);
tree.insert(150);
tree.insert(200);
tree.insert(250);
tree.insert(300);
tree.insert(400);

tree.prettyPrint();

console.log(`Is balanced: ${tree.isBalanced()}`);

tree.rebalance();

tree.prettyPrint();

console.log(`Is balanced: ${tree.isBalanced()}`);
console.log(`Elements in level order: ${tree.levelOrder()}`);
console.log(`Elements in pre-order: ${tree.preOrder()}`);
console.log(`Elements in post-order: ${tree.postOrder()}`);
console.log(`Elements in in-order: ${tree.inOrder()}`);