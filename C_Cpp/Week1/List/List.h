#pragma once
#include <stdio.h>
#include <cstdlib>
// C Style

// Define Node

typedef int ElementType;

typedef struct tagNode
{
	ElementType Data;
	struct tagNode* NextNode;
}Node;

// Create Node 

Node* CreateNode(ElementType data)
{
	Node* NewNode = (Node*)malloc(sizeof(Node));  // Save HeapMemory
	NewNode->Data = data;
	NewNode->NextNode = NULL;

	return NewNode;
}

//==============================================================
// Problem Version

//Node* CreateNode(ElementType data)
//{
//	Node NewNode;   // Save StackMemory
//	NewNode.Data = data; 
//	NewNode.NextNode = NULL;
//
//	return &NewNode;
//}  // Delete NewNode => Problem
//==============================================================


// Destory Node 

void DestroyNode(Node* Node) { free(Node); }

void DestroyAllNodes(Node** List)
{
	Node* Head = *List;

	while (Head != NULL)
	{
		Node* temp = Head;
		Head = Head->NextNode;
		free(temp);
	}

	*List = NULL;
}

// Append Node 
void AppendNode(Node** Head, Node* NewNode)
{
	if (*Head == NULL)
	{
		*Head = NewNode;
	}
	else
	{
		Node* Tail = *Head;
		while (Tail->NextNode != NULL)
		{
			Tail = Tail->NextNode;
		}
		Tail->NextNode = NewNode;
	}
}

// Search by Data
Node* GetNode_Data(Node* Head, ElementType data)
{
	Node* Current = Head;

	while (Current->Data != data)
	{
		Current = Current->NextNode;
	}

	return Current;
}

// Search by Location
Node* GetNode_Location(Node* Head, int Location)
{
	Node* Current = Head;
	while (Current != NULL && (--Location) >= 0)
	{
		Current = Current->NextNode;
	}

	return Current;
}


// Delete Node
void RemoveNode(Node** Head, Node* Remove)
{
	if (*Head == Remove)
	{
		*Head = Remove->NextNode;
	}
	else
	{
		Node* Current = *Head;
		while (Current != NULL && Current->NextNode != Remove)
		{
			Current = Current->NextNode;
		}

		if (Current != NULL)
		{
			Current->NextNode = Remove->NextNode;
		}
	}

}

// Insert After Node 
void InsertNodeAfter(Node* Current, Node* NewNode)
{
	NewNode->NextNode = Current->NextNode;
	Current->NextNode = NewNode;
}

// Insert Before Node 
void InsertNodeBefore(Node** Head, Node* Current, Node* NewNode)
{
	Node* start = *Head;
	while (start->NextNode != Current)
	{
		start = start->NextNode;
	}

	start->NextNode = NewNode;
	NewNode->NextNode = Current;
}


// Count Node
int CountNode(Node* Head)
{
	int cnt = 0;
	while (Head != NULL)
	{
		Head = Head->NextNode;
		cnt++;
	}

	return cnt;
}

//Print List
void PrintList(Node* Head)
{
	while (Head != NULL)
	{
		printf("{Addr : %p || Data : %d  ||  Next : %p }\n", Head, Head->Data, Head->NextNode);
		Head = Head->NextNode;
	}
}


