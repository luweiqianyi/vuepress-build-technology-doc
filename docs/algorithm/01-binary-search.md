---
sidebar: auto
prev: /algorithm/00-intrduction.html
next: false
---
# 二分算法
* 定位：查找算法
* 功能：在一个有序数列中找到目标值。

## 使用c++标准库完成二分查找
c++标准库`<algorithm>`提供`binary_search`函数来完成二分查找功能，其缺点是只能判断目标值在不在待查找有序数列中，不能返回目标值在该数列中的索引。示例如下：
```cpp
#include<cstdio>
#include<algorithm>
using namespace std;

int main() {
	int a[] = {1,2,5,7,10,23,56,114,201,300};
	int len = sizeof(a) / sizeof(a[0]);

	bool find = std::binary_search(a, a + len - 1, 1); // 查询 [a[0],a[len-1])之间的数
	printf("query 1: %d\n", find);

	find = std::binary_search(a, a+len-1, 300); 
	printf("query 300: %d\n", find);

	find = std::binary_search(a, a +len-1, 201); 
	printf("query 201: %d\n", find);

	find = std::binary_search(a, a + len - 1, 600);
	printf("query 600(not in): %d\n", find);
}
```
* 查找了4个数，分别是`1`，`300`，`201`，`600`
* `1`在最开始，`300`在最后，`201`在中间，`600`不在数列中
* 输出`0`表示数不在数组中，输出`1`表示数在数组中

结果如下：
```log
query 1: 1
query 300: 0
query 201: 1
query 600(not in): 0
```
可以看出：
* `1`和`201`都找到了并返回`1`
* `300`没找到，但是`300`在数组中。为什么？原因是`std::binary`查找的数不包含数组的最右侧的值。相当于数学中的开闭区间`[a[0],a[len-1])`，开区间的值`a[len-1]`是不包含在内的,所以`300`输出的是`0`
* `600`不在数组中，输出`0`，是正常现象


## 自己实现二分算法
上面的标准库中的算法只能判断值在不在，不能返回索引位置，在某些应用场合不符合我们的需求，所以可能需要进行相应改进。
### 二分查找
```cpp
template<typename T, typename Container>
int my_binary_search(const Container& container, int len, const T& target) {
	int begin = 0;
	int end = len-1;

	while (true)
	{
		if (begin > end) {
			break;
		}

		int mid = (begin + end) / 2;
		if (container[mid]==target) {
			return mid;
		}
		else if (container[mid]<target)
		{
			begin = mid + 1;
		}
		else
		{
			end = mid - 1;
		}
	}

	return -1;
}
```
### 测试代码
```cpp
#include<cstdio>
using namespace std;

int main() {
	int a[] = {1,2,5,7,10,23,56,114,201,300};
	int len = sizeof(a) / sizeof(a[0]);

    int index = my_binary_search(a, len, 1);
    printf("index: %d\n",index);

	index = my_binary_search(a, len, 300);
	printf("index: %d\n", index);

	index = my_binary_search(a, len, 56);
	printf("index: %d\n", index);

	index = my_binary_search(a, len, 145);
	printf("index: %d\n", index);
	return 0;
}
```
输出如下：
```log
index: 0
index: 9
index: 6
index: -1
```
> -1：表示没找到。