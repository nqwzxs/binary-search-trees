class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = array.sort(function (a, b) { return a - b })
      .filter(function (value, index, array) { return array.indexOf(value) === index });

    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);
    if (node.data === value) return;

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  delete(value, node = this.root) {
    if (!node) return node;

    if (value < node.data) {
      node.left = this.delete(value, node.left);
      return node;
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
      return node;
    }

    if (!node.left) {
      return node.right;
    } else if (!node.right) {
      return node.left;
    } else {
      let succParent = node;
      let succ = node.right;

      while (succ.left) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== node) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      node.data = succ.data;
      return node;
    }
  }

  find(value, node = this.root) {
    if (!node) return 'Node not found!';
    if (node.data === value) return node;

    if (node.data > value) {
      return this.find(value, node.left);  
    } else {
      return this.find(value, node.right);
    }
  }

  levelOrder(callback) {
    if (!this.root) return;

    let result = [];
    let queue = [this.root];
    
    while (queue.length > 0) {
      let node = queue.shift();
      
      callback ? callback(node) : result.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (!callback) return result;
  }

  inorder(callback, node = this.root, result = []) {
    if (!node) return;

    this.inorder(callback, node.left, result);
    callback ? callback(node) : result.push(node.data);
    this.inorder(callback, node.right, result);

    if (!callback) return result;
  }

  preorder(callback, node = this.root, result = []) {
    if (!node) return;

    callback ? callback(node) : result.push(node.data);
    this.preorder(callback, node.left, result);
    this.preorder(callback, node.right, result);

    if (!callback) return result;
  }
  
  postorder(callback, node = this.root, result = []) {
    if (!node) return;

    this.postorder(callback, node.left, result);
    this.postorder(callback, node.right, result);
    callback ? callback(node) : result.push(node.data);

    if (!callback) return result;
  }

  height(node = this.root, height = 0) {
    if (!node) return height;

    const leftHeight = this.height(node.left, height);
    const rightHeight = this.height(node.right, height);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root, depth = 0) {
    if (!root) return 'Node doesn\'t exists!';
    if (root === node) return depth;

    if (node.data < root.data) {
      return this.depth(node, root.left, depth + 1);  
    } else {
      return this.depth(node, root.right, depth + 1);
    }
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    
    const leftHeight = this.height(node.left, 0);
    const rightHeight = this.height(node.right, 0);

    const heightDiff = Math.abs(leftHeight - rightHeight);
    return heightDiff < 2 && this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const array = this.levelOrder();
    this.root = this.buildTree(array, 0, array.length - 1);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 24, 51, 38, 77]);

tree.prettyPrint(tree.root);
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());

tree.insert(727);
tree.insert(667);
tree.insert(1337);
tree.insert(999);
tree.insert(888);

tree.prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.rebalance();

tree.prettyPrint(tree.root);
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());