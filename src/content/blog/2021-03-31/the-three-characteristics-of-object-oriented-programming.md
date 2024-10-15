---
title: "The Three Characteristics of Object Oriented Programming"
description: ""
category: 
date: 2021-03-31
cover_image: "./Object-Oriented-Programming-with-Java.png"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/juarZ0CFChc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I am currently creating a series of videos going over potential interview questions that might come up for a technical interview. I decided to do my first video on the three characteristics of Object-Oriented Programming.

The term Object-Oriented Programming was coined by Alan Kay while developing SmallTalk at Xerox PARC. The key feature is that you can write software in the form objects that can speak to each other, or call on each other.

The three characteristics that actually make Object-Oriented Programming are Encapsulation, Inheritance and Polymorphism.

# Encapsulation

Encapsulation is about hiding the implementation details of an object from the consumer of the object. If you are using Java or C#, we use access modifiers like `private` and `protected` to make variables and methods available only to the object itself or its library or package. The consumer of the object does not need the internal details of the object, only the publicly available methods and properties. Another reason may that we may want a cunsumer to read a value, but not change a value of a property or value. Allowing this could potentially allow bugs to be introduced into an application.

```csharp
class Mortgage {
    private float interest = 2.87;

    public float getInterest() {
        return interest;
    }
}
```

In the example above we have a class that has a private variable for the class that has holds the value of the `interest` for our Mortgage class. We have a method called `getInterest` that allows a caller to retrieve the interest value. This is how encapsulation works. We could create a method that increments the interest for this class while still preventing the caller direct access.

```csharp
class Mortgage {
    private float interest = 2.87;

    public float getInterest() {
        return interest;
    }

    public void incrementInterestBy10() {
        interest = interest * 0.10; 
    } 
}
```

In this example we were able to modify the interest value without giving the caller access to the private variable.

# Inheritance

Another characteristic of OOP is the ability of one object to inherit from another object. Some languages like C++ can inherit from multiple objects. Languages like Java and C# can only inherit from one object, but can inherit from multiple interfaces. 
The object that is inheriting the methods, properties and variables from another object is called the child object. The object that is being inherited is the parent object.

```csharp
using System;

namespace inheritance {
    class Person {
        public string Name { get; set; }
    }

    class Employee : Person {
        public string Department { get; set; }

        public void describe() {
            string desc = $"The person with name {Name} works in Department {Department}";
            Console.WriteLine(desc);
        }
    }
}
```

In the example above we have two classes, one called `Person`, and the other called `Employee`. If we look at the example above, we can see that the class `Employee` is followed by a colon and then the name of the previous class `Person`. The `Employee` class is inheriting the properties from the `Person` class. This is important because it means we do not have to redeclare the `Name` property in the `Employee` class. We get all of methods, properties and variables from `Person` class for free just by inheriting it into our `Employee` class.

# Polymorphism

The term Polymorphism means the ability to change. For the purposes of OOP, while we can inherit from one class to another, we can also change the behavior of certain methods. We do not have to use the default implementation of all of the properties and methods that we inherited from a parent class. When we do this, we are creating our own or new implementation of a method or property. Most OOP languages have a keyword that allows us to override the default method or property as we can see from the example below.

```csharp
using System;

namespace inheritance {
    class Person {
        public string Name { get; set; }

        public virtual void describe() {
            string desc = $"The person with name {Name}";
            Console.WriteLine(desc);
        }
    }

    class Employee : Person {
        public string Department { get; set; }

        public override void describe() {
            string desc = $"The person with name {Name} works in Department {Department}";
            Console.WriteLine(desc);
        }
    }
}
```

As we can see in the `Person` class above, we have a method called `describe` that prints out a description of the object with the name of the person. In the `Employee` class we have created a new implementation of the `describe` method that includes the name and the department of the employee.

In C# you can tell the compiler that you want a method to be overridable by add the `virtual` keyword before the return type. When you override the inherited method or property you use the `override` keyword before the return type.

# Summary

This just scratches the surface of some of the things you can do with OOP languages. There are far too many topics to cover in a single post, but I hope this helps you with the basics of the three main characteristics of Object-Oriented Programming languages.
