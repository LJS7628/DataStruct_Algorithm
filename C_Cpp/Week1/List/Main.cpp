#include "List.h"

int main()
{
	Node* List = NULL;

	for (int i = 0; i < 5; i++)
	{
		Node* newNode = CreateNode(i);
		AppendNode(&List, newNode);
	}

	//PrintList(List);

	//Node* newNode = CreateNode(5);
	//Node* Current = GetNode_Location(List,2);
	//InsertNodeAfter(Current, newNode);
	//InsertNodeBefore(&List, Current, newNode);

	//printf("\n\n");
	//PrintList(List);

	DestroyAllNodes(&List);

	int a = 0;

	return 0;
}