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
    const sortedArray = array.sort(function (a, b) { return a - b })
      .filter(function (value, index, array) { return array.indexOf(value) === index });
    
    return this.sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
  }

  sortedArrayToBST(array, start, end) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.sortedArrayToBST(array, start, mid - 1);
    node.right = this.sortedArrayToBST(array, mid + 1, end);

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
    let queue = [];
    queue.push(this.root);
    
    while (queue.length > 0) {
      let node = queue[0];
      
      callback ? callback(node) : result.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      queue.shift();
    }

    if (!callback) return result;
  }

  inorder(callback, node = this.root, result = []) {
    if (!node && !callback) return result;
    if (!node) return;

    this.inorder(callback, node.left, result);
    callback ? callback(node) : result.push(node.data);
    this.inorder(callback, node.right, result);

    if (!callback) return result;
  }

  preorder(callback, node = this.root, result = []) {
    if (!node && !callback) return result;
    if (!node) return;

    callback ? callback(node) : result.push(node.data);
    this.preorder(callback, node.left, result);
    this.preorder(callback, node.right, result);

    if (!callback) return result;
  }
  
  postorder(callback, node = this.root, result = []) {
    if (!node && !callback) return result;
    if (!node) return;

    this.postorder(callback, node.left, result);
    this.postorder(callback, node.right, result);
    callback ? callback(node) : result.push(node.data);

    if (!callback) return result;
  }

  height(node = this.root, height = 0) {
    if (!node) return height;

    height++;
    const leftHeight = this.height(node.left, height);
    const rightHeight = this.height(node.right, height);

    return Math.max(leftHeight, rightHeight);
  }

  depth(node, root = this.root, depth = 0) {
    if (!root) return 'Node doesn\'t exists!';
    if (root === node) return depth;

    depth++;
    if (node.data < root.data) {
      return this.depth(node, root.left, depth);  
    } else {
      return this.depth(node, root.right, depth);
    }
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.root);

tree.insert(727);
tree.prettyPrint(tree.root);

tree.delete(8);
tree.prettyPrint(tree.root);

console.log(tree.find(1));
tree.prettyPrint(tree.root);

console.log(tree.levelOrder());

console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());

console.log(tree.height());

tree.prettyPrint(tree.root);
console.log(tree.depth(tree.find(727)));