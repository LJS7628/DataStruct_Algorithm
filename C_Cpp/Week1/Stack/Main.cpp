//#include "ArrayStack.h"
#include "LinkedListStack.h"

int main()
{
	//ArrayStack* Stack = NULL;
	//CreateStack(&Stack, 10);

	//for (int i = 0; i < 10; i++)
	//{
	//	Push(Stack, i);
	//}

	//for (int i = 0; i < 10; i++)
	//{
	//	printf("%d ", Pop(Stack));
	//}

	LinkedListStack* Stack;
	CreateStack(&Stack);
	Push(Stack,CreateNode("abc"));
	Push(Stack, CreateNode("def"));
	Push(Stack, CreateNode("ghi"));
	Push(Stack, CreateNode("jkl"));
	Push(Stack, CreateNode("mno"));

	Pop(Stack);


	return 0;
}
