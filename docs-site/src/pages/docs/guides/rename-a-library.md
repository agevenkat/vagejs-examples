---
title: Rename a whole photo library
description: Rename every photo in a folder of folders with Kettlemark, keeping each file in its folder, with a preview before anything changes.
navTitle: Rename a library
order: 1
---

# Rename a whole photo library

If your photos are spread across folders, like one per year or per trip, Kettlemark can rename them all in one go. Each file stays in its own folder; only the name changes.

## 1. Preview everything

Add `--recursive` to include every folder inside:

```bash
kettlemark preview ~/Pictures --recursive
```

For a large library, save the preview to a file and read it at your own pace:

```bash
kettlemark preview ~/Pictures --recursive > preview.txt
```

## 2. Check the summary

The last lines tell you how many files would change and how many were skipped:

```
1,842 files will be renamed in 37 folders.
96 skipped: no date taken.
3 skipped: name already in use.
```

"Name already in use" means two photos were taken in the same second. See [duplicates](/docs/reference/configuration/#duplicates) for how Kettlemark handles them.

## 3. Rename

```bash
kettlemark rename ~/Pictures --recursive
```

Kettlemark writes one `.kettlemark-log.json` in each folder it changes, so you can undo one folder without touching the others.

## Tips

- Make a backup first if this is the only copy of your photos. Kettlemark only renames files, but a backup is always a good idea.
- Leave out folders you don't want renamed with `--exclude`, for example `--exclude "Scans/**"`.
