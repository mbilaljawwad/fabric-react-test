# Classmates

You're working on an app that lists classmates.

1. User can add new classmates from the form. They appear in the list. The last one appears on top. (e.g., Twitter timeline)
2. User can make friends/unfriend by toggling 'friend' checkbox on each list item.
3. User can undo the past actions.
4. User can redo the undone actions.

## How undo & redo should work

If user clicks undo after adding a classmate, the new classmate is removed from the list.
Then user clicks redo, the classmate comes back to the list.

- Add new classmate -> new classmate appears in the list
- Click undo -> new classmate gets removed from the list
- Click redo -> new classmate comes back to the list

If user clicks undo twice after two actions, each action gets canceled one by one.
These canceled actions can be restored by clicking redo.

- Add new classmate -> new classmate appears in the list
- Pick a classmate and make friends
- Click undo -> unfriend the classmate
- Click undo -> new classmate gets removed from the list
- Click redo -> new classmate comes back to the list
- Click redo -> make friends again with new classmate

If user makes new action after undoing the previous action, user shouldn't be able to redo, (as there's nothing to redo) but user can undo.

- Add new classmate -> new classmate appears in the list
- Pick a classmate and make friends
- Click undo -> unfriend the classmate
- Add another classmate -> another classmate appears in the list
- Click redo -> nothing happens
- Click undo -> another classmate gets removed from the list
- Click redo -> another classmate comes back to the list

## Constraints

- No limitations for the number of undo/redo
