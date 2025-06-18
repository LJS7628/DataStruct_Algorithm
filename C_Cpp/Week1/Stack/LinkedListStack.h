#pragma once
#include <stdio.h>
#include <string.h>
#include <cstdlib>

typedef struct tagNode 
{
	char* Data;
	struct tagNode* NextNode;

}Node;

typedef struct tagLinkedListStack 
{
	Node* List;
	Node* Top;
}LinkedListStack;

// Create Stack
void CreateStack(LinkedListStack** Stack)
{
	(*Stack) = (LinkedListStack*)malloc(sizeof(LinkedListStack));
	(*Stack)->List = NULL;
	(*Stack)->Top = NULL;
}

int IsEmpty(LinkedListStack* Stack)
{
	return (Stack->List == NULL);
}

//Pop
Node* Pop(LinkedListStack* Stack)
{
	Node* TopNode = Stack->Top;

	if (Stack->List == Stack->Top)
	{
		Stack->List = NULL;
		Stack->Top = NULL;
	}
	else
	{
		Node* CurrentTop = Stack->List;
		while (CurrentTop != NULL && CurrentTop->NextNode != Stack->Top)
		{
			CurrentTop = CurrentTop->NextNode;
		}
		Stack->Top = CurrentTop;
		Stack->Top->NextNode = NULL;
	}

	printf("%s", TopNode->Data);
	return TopNode;
}

// Destroy Node
void DestroyNode(Node* Node)
{
	free(Node->Data);
	free(Node);
}


// Destroy Stack
void DestroyStack(LinkedListStack* Stack) 
{
	while (!IsEmpty(Stack)) 
	{
		Node* Popped = Pop(Stack);
		DestroyNode(Popped);
	}

	free(Stack);
}

// Create Node 
Node* CreateNode(const char* NewData) 
{
	Node* NewNode = (Node*)malloc(sizeof(Node));
	NewNode->Data = (char*)malloc(strlen(NewData)+1);

	strcpy_s(NewNode->Data, strlen(NewData) + 1, NewData);

	NewNode->NextNode = NULL;

	return NewNode;
}



//Push
void Push(LinkedListStack* Stack, Node* NewNode) 
{
	if (Stack->List == NULL) 
	{
		Stack->List = NewNode;
	}
	else 
	{
		Stack->Top->NextNode = NewNode;
	}

	Stack->Top = NewNode;
}



Node* Top(LinkedListStack* Stack) 
{
	return Stack->Top;
}

int GetSize(LinkedListStack* Stack)
{
	int cnt = 0;
	Node* Current = Stack->List;

	while (Current != NULL) 
	{
		Current = Current->NextNode;
		cnt++;
	}

	return cnt;
}




