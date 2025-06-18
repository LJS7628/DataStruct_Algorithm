#pragma once
#include <stdio.h>
#include <cstdlib>
typedef int ElementType;

typedef struct tagNode
{
	ElementType Data;

}Node;


typedef struct tagArrayStack
{
	int Capacity;
	int Top;
	Node* Nodes;

}ArrayStack;


// Create Stack
void CreateStack(ArrayStack** Stack, int Capacity)
{
	(*Stack) = (ArrayStack*)malloc(sizeof(ArrayStack));
	(*Stack)->Nodes = (Node*)malloc(sizeof(Node) * Capacity);

	(*Stack)->Capacity = Capacity;
	(*Stack)->Top = -1;
}

// Destory Stack
void DestoryStack(ArrayStack* Stack)
{
	free(Stack->Nodes);
	free(Stack);
}

// Push
void Push(ArrayStack* Stack, ElementType Data)
{
	Stack->Top++;
	Stack->Nodes[Stack->Top].Data = Data;
}

// Pop
ElementType Pop(ArrayStack* Stack)
{
	int  Position = Stack->Top--;
	return Stack->Nodes[Position].Data;
}