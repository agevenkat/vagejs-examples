---
title: Kettlemark
description: Kettlemark renames your photos and videos by the date they were taken, so every folder sorts itself. Preview first, rename, and undo any time.
---

# Your photos, filed by the day they were taken.

Kettlemark is a small command-line tool that renames photos and videos using the date stored inside each file. `IMG_4021.HEIC` becomes `2026-03-14_091522.heic`, and every folder sorts itself in the order things happened.

```
$ kettlemark preview ~/Pictures/Goa
IMG_4021.HEIC   ->  2026-03-14_091522.heic
IMG_4022.HEIC   ->  2026-03-14_091547.heic
DSC00118.JPG    ->  2026-03-14_101003.jpg
VID_0007.MP4    ->  2026-03-14_174410.mp4

4 files will be renamed. Run "kettlemark rename ~/Pictures/Goa" to apply.
```

## Three commands, in this order

1. **Preview.** `kettlemark preview` shows every new name and changes nothing.
2. **Rename.** `kettlemark rename` applies the names and keeps a log in the folder.
3. **Undo.** `kettlemark undo` puts every file back, using that log.

## Start here

New to Kettlemark? [Install it and rename your first folder](/docs/getting-started/) in about five minutes. Looking for a flag or setting? The [command reference](/docs/reference/commands/) and [configuration reference](/docs/reference/configuration/) list them all.
