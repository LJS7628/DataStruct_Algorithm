class BinaryTree
{
    constructor(data,leftTree = null, rightTree = null)
    {
        this.data = data;
        this.leftSubTree = leftTree;
        this.rightSubTree = rightTree;

    }

    GetData()
    {
        return this.data; 
    }

    SetData(data)
    {
        this.data = data;
    }

    GetLeftSubTree()
    {
        return this.leftSubTree;
    }

    GetRightSubTree()
    {
        return this.rightSubTree;
    }

    SetLeftSubTree(node)
    {
        this.leftSubTree = node;
    }

    SetRightSubTree(node)
    {
        this.rightSubTree = node;
    }
    
    PreOrderTraversal(node)
    {
      if(node == null) return;

      console.log(node.data);
      this.PreOrderTraversal(node.GetLeftSubTree());  
      this.PreOrderTraversal(node.GetRightSubTree());
    }

    InOrderTraversal(node)
    {
        if(node == null) return;

        this.InOrderTraversal(node.GetLeftSubTree());  
        console.log(node.data);
        this.InOrderTraversal(node.GetRightSubTree());
    }

    PostOrderTraversal(node)
    {
        if(node == null) return;

        this.PostOrderTraversal(node.GetLeftSubTree());  
        this.PostOrderTraversal(node.GetRightSubTree());
        console.log(node.data);
    }
}

export{BinaryTree};
