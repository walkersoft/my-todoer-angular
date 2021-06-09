# What To Do??

A small, getting-your-feet-wet, exercise with Angular. The app tracks a set of daily tasks and a simple checklist of items - great for managing your day's agenda or a trip to the grocery store.

## App Website

Try it out [here](https://todo.mylaunchpad.online)!

## Features

This app does two main things: manages a set of tasks for a given day and keeps track of items in a basic checklist.

### Daily Tasks

The main feature is to manage tasks for a given day. Each day a new task list can be created, and then populated with tasks that you are looking to completes. These items can be marked off as done, edited, or deleted from the list.

A single task list can be active for a specific day, so if a task list is active (even if empty) a new list cannot be created until the next day. Upon creating a new list, incomplete items will be moved to the new list and marked as missed (including how many times) from the day before. 

### Checklist

There isn't much to explain here - it is a simple checklist of items to check off. Perfect for trips out to a store or prep work for a family dinner.

## Storage

This app stores data in JSON format and uses [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) in the browser. This means that storage and persistence is unique per device and browser.

## License

The source code for this app is release under the [MIT License](LICENSE.md).
