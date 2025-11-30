---
title: "Using Generics in Mojo"
tags: ["Python", "Mojo", "Generics"]
description: "Using Generics in Mojo"
category:
date: 2025-11-29
cover_image: "./gpu.png"
---

If you are not familiar with [Mojo](https://docs.modular.com/mojo/manual/), it is a programming language from a startup company called [Modular](https://modular.com) that is building tools for building AI software. I started playing with the previews a couple of years ago, but I recently have started taking a look again at the language.

Mojo is a superset of [Python](https://python.org). Think of it as a Python with a type system, but with a compiler specifically targeting GPUs, TPUs, NPUs and any hardware that it take advantage of with it's MLIR based compiler.

When I first took a look at Mojo, I did not know Python well at all. For the past month I have been learning how use Python, specifically for data science and machine learning. Python is great to use for many different types of computing tasks, but it the most popular language for machine learning and AI applications.

Python does have it's downsides. It is not very fast because it is an interpreted language. Most interpreters do not take advantage of the advanced hardware that is available on modern desktops and servers. This is why many of the libraries that run on Python are written in CPython where data intensive tasks can be offloaded to GPUs for complex math operations. 

## Statistics functions

One of the things I really like about Python is that it has several builtin functions for certain operations like `sum` and `len`. There is also a statistics library in Python that also has methods for `mean`, `median` and `mode`. So if you have an list of numbers in Python, and you want to get the average, you can very easily write a function like the following:

```python
def calculate_mean(numbers):
    return sum(numbers) / len(numbers)

my_list = [10, 20, 30]
avg = calculate_mean(my_list)
print(f"The average of {my_list} = {avg}")
```

You could also write this the same way using the builtin statistics library:

```python
import statistics as st

my_list = [10, 20, 30]
avg = st.mean(my_list)
print(f"The average of {my_list} = {avg}")
```

Mojo does not have a builtin `sum` function for lists. While Mojo can use Python libraries, you will not get the speed advantage unless the code is written in Mojo or MLIR. You can explicitly write a function that will sum up a list of numbers, if you want it to be used with different numeric types such as Int or FLoat32, you need to use Mojo's generics.

Many languages use Generics or templates so you do not have to explicitly set a particular type. Languages such as Java, C#, TypeScript, Swift, Rust and even Objective-C have a generic system. In a language like C#, generics are used heavily over collection types. Here is an example of a C# method written using a Generic type:

```c#
public static T FirstOrDefault<T>(IEnumerable<T> source)
{
    foreach (var item in source)
    {
        return item;
    }
    return default!;
}
```

Mojo Generics

The generic system in Mojo is quite powerful, but is different from just about any other I have seen in any language. Because Mojo is meant to work with GPUs and other processors that can process large computations in parallel like SIMD, that type system has types for a large variation of numerical units and types like tensors and arrays. Here is an example from Modular's documentation on creating a SIMD vector:

```mojo
var vec1 = SIMD[DType.int8, 4](2, 3, 5, 7)
var vec2 = SIMD[DType.int8, 4](1, 2, 3, 4)
var product = vec1 * vec2
print(product)
```

If we look at the example above, the SIMD struct constructor function has a type and a compile time argument. The first line has a SIMD vector that uses a generic type of DType.int8, but is specifying a parameter for the size of the vector of only being able to contain four ints. The important thing to remember here is that generic type is expressed in the square brackets in front of the parenthesis.

If we want to define our own function for summing up all of the values in a list, we could that like the example below:

```mojo
fn sum[dt: DType](my_list: List[Scalar[dt]]) -> Scalar[dt]:
    var acc = Scalar[dt](0)
    for x in my_list:
        acc += x
    return acc

fn mean[dt: DType](my_list: List[Scalar[dt]]) -> Scalar[dt]:
    return sum(my_list) / len(my_list)
```

In the previous example we have specified the data type as a `dt` with a base type of `DType`. In the parameter we are specifying a List of type `Scaler[dt]` and a return type of `Scaler[dt]`.

Now if I want to sum up the numbers in a list, I can do that with any datatype that would conform to a scaler value. Here is an example of using this function:

```mojo
my_list: List[Int32] = [10, 20, 30]
var result = sum(my_list)
print(result) # 60

# or

my_list: List[Float64] = [10.0, 20.0, 30.0]
var result = sum(my_list)
print(result) # 60.0
```

## Conclusion

Right now to take full advantage of different processors, AI engineers are writing processor specific code like cuda kernels for NVIDIA GPUs. This means if you want your code to run the fastest possible you have to write code for a specific GPU.

The nice thing about Mojo is that it has the potential to compile optimized code for any processor covered by the compiler. Right now the Mojo compiler can compile code for NVIDIA GPUs, AMD GPUs and Apple M series silicon chips. In the future Modular plans on supporting a much wider series of processors. Even without supporting every kind of processor you can still write code that out performs the Python interpreter with code is still pythonic in nature.

Getting to know Mojo generics is great way to become more familiar with their type system.