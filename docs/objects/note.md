# Note

A `Note` object symbolizes a basic post or publication within the Lysand protocol. It is the most frequently used object type.

`Note` objects extend all properties from the [Publication](./publications) object, thereby inheriting its characteristics and behaviors.

### Types

```typescript
interface Note extends Publication {
    type: "Note";
}
```