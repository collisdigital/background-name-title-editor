# Data Models: Virtual Background Editor

## BackgroundImage

Represents a single, selectable background image available in the application.

| Field | Type | Description | Validation |
|---|---|---|---|
| `id` | `string` | A unique identifier for the image. | Required, unique. |
| `name` | `string` | The display name for the image. | Required. |
| `src` | `string` | The path to the image file. | Required, must be a valid path. |
| `placeholders` | `Placeholder[]` | An array of text placeholder configurations for this image. | Required. |

## Placeholder

Defines a region on a `BackgroundImage` where text can be rendered.

| Field | Type | Description | Validation |
|---|---|---|---|
| `id` | `string` | A unique identifier for the placeholder (e.g., 'name', 'title'). | Required, unique within an image. |
| `x` | `number` | The x-coordinate of the top-left corner of the text box. | Required, integer. |
| `y` | `number` | The y-coordinate of the top-left corner of the text box. | Required, integer. |
| `width` | `number` | The width of the text box. | Required, integer. |
| `font` | `string` | The font family to use (e.g., 'Arial', 'Helvetica'). | Required. |
| `fontSize` | `number` | The size of the font in pixels. | Required, integer. |
| `fill` | `string` | The color of the text (e.g., '#FFFFFF'). | Required. |
| `textAlign` | `'left' \| 'center' \| 'right'` | The horizontal alignment of the text. | Required. |

## UserInput

Represents the text data entered by the user. This is a transient data model used for managing application state.

| Field | Type | Description |
|---|---|---|
| `name` | `string` | The user's entered name. |
| `jobTitle` | `string` | The user's entered job title. |
