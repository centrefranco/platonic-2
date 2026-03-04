---
title: Image Optimization
description: Working with Images
order: 53
---

# Working with Images

## Import the Image

To use images contained in Decap, you need to import them using an import statement:

```javascript
import Kyoto from '@assets/kyoto-1.jpg'
```

The import path can be found in the debug tools:

![Import Image](/images/docs/image-import.png)

## Using the Image

Once you have the image imported, you can use it to populate the Astro Image component.

```javascript
---
import Kyoto from "@assets/kyoto-1.jpg"
import { Image } from 'astro:assets';
---
<Image
  src={Kyoto.src}
  alt={page.content[1].alt}
  height="175"
  width="600"
  class="mt-8"
/>
```

For more information on how to use Astro's Image component, visit [Images in .astro files](https://docs.astro.build/en/guides/images/#images-in-astro-files).
