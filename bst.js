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

  
}

const array = [5, 4, 6, 3, 2, 1, 0, 30, 25, 39, 99];
const tree = new Tree(array);

tree.prettyPrint();

tree.insert(7);
tree.insert(-7);
tree.insert(11);

tree.prettyPrint();

tree.deleteItem(5);
tree.prettyPrint();

tree.deleteItem(25);
tree.prettyPrint();