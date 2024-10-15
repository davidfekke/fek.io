---
title: "Boxing and Unboxing in C#"
description: ""
category: 
date: 2021-04-01
cover_image: "./erda-estremera-unbox.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/plQSaBWscLM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

One question that might come up in a C# job interview is what is boxing and unboxing. In .NET there are three different types of objects, value types, reference types and pointer types.
The two common types that are usually used are reference types and value types. Value types are normally used for simple values like integers, floats and chars. Reference types are usually used  for more complex types that are based on classes. A string in .NET is an example of a reference type.

When you take a value type and make it a reference type, that is called `boxing`. When you take a reference type and convert it into a value type, that is called `unboxing`. If I want to take an Integer and cast it to an object like in the example below, this is an example of `boxing`.

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        int num1 = 42;

        object obj1 = num1;

        System.ConsoleWriteLine("Value is : {0}", num1);
        // Value is : 42
        System.ConsoleWriteLine("Object is : {0}", obj1);
        // Object is : 42
    }
}
```

In the example above, the `num1` variable is value, and we unboxed it into a reference called `obj1`. The `obj1` reference is of type `object`, which is the base reference type in .NET.

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        int num1 = 42;

        object obj1 = num1;

        num1 = 10_000;

        System.ConsoleWriteLine("Value is : {0}", num1);
        // Value is : 10000
        System.ConsoleWriteLine("Object is : {0}", obj1);
        // Object is : 42
    }
}
```

In the example above we changed the value `num1` to 10,000, but the `obj1` object has a copy of the number 42 from where it was boxed. 

# Unboxing

If I want to take the reference type of `obj1` and cast that back into a integer, that is an example of unboxing. To do that we will have to cast it it back into an Int.

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        int num1 = 42;

        object obj1 = num1;

        num1 = 10_000;
        int num2 = (int)obj1;

        System.ConsoleWriteLine("Value is : {0}", num1);
        // Value is : 10000
        System.ConsoleWriteLine("Object is : {0}", obj1);
        // Object is : 42
        System.ConsoleWriteLine("Value2 is : {0}", num2);
        // Value is : 42
    }
}
```

Subsequently we can make a new object from the `num1` value, and it will maintain a refernce to that first object. if we change the value of the new object, we will lose the refence to the original object.

```csharp
object obj2 = obj1;
obj2 = num1;
System.Console.WriteLine ("Object1 is : {0}", obj1);
// Object1 is : 42
System.Console.WriteLine ("Object2 is : {0}", obj2);
// Object2 is : 10000
```

# Summary

`Boxing` and `Unboxing` is a powerful feature in C#. The important thing to remember is that when we unbox a reference type to a value type, we have made a copy of that value and we are no longer maintaining a reference to the `reference` type.