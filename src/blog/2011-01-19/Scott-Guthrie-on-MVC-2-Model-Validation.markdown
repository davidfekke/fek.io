---
layout: post
title: "Scott Guthrie on MVC 2 Model Validation"
category: "Blog"
tags: [ASP.NET MVC]
date: 2011-01-19
---


[Scott Guthrie](http://weblogs.asp.net/scottgu/archive/2010/01/15/asp-net-mvc-2-model-validation.aspx) in his latest blog post explains one of the cool new features in ASP.NET MVC 2: Model Validation. MVC already had a way of validating that worked pretty well, but with MVC 2 has improved on this with new DataAnnotation Validation attributes.

```c#
using System;
using System.ComponentModel.DataAnnotations;

namespace fekkedotcomMVC.Models
{
    public class Person
    {        
        //Example of required attributes.        
        [Required(ErrorMessage="First Name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
    }
}
```

There are also attributes for length and regular expressions. You can also add your own by extending one of the annotation classes.