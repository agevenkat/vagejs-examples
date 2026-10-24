---
title: Getting started
description: Install Kettlemark, preview new names for a folder of photos, apply them, and undo if you change your mind.
order: 2
---

# Getting started

This takes about five minutes. You'll install Kettlemark, see what it would do to a folder of photos, apply the new names, and learn how to undo them.

## Install

With Homebrew on macOS or Linux:

```bash
brew install kettlemark
```

With npm on any system (needs Node.js 20 or newer):

```bash
npm install --global kettlemark
```

Check that it works:

```bash
kettlemark --version
```

It prints `kettlemark 1.4.0`.

## Preview a folder

Pick a folder of photos. Start with a copy if you'd like to be careful. Then run:

```bash
kettlemark preview ~/Pictures/Goa
```

Kettlemark lists each file and the name it would get. Nothing changes yet:

```
IMG_4021.HEIC   ->  2026-03-14_091522.heic
IMG_4022.HEIC   ->  2026-03-14_091547.heic
DSC00118.JPG    ->  2026-03-14_101003.jpg
screenshot.png  ->  (skipped: no date taken)

3 files will be renamed, 1 skipped.
```

Files without a date are skipped by default. The guide on [photos without a date](/docs/guides/photos-without-dates/) explains your options.

## Apply the new names

When the preview looks right:

```bash
kettlemark rename ~/Pictures/Goa
```

Kettlemark renames the files and writes `.kettlemark-log.json` in the same folder. Keep that file if you might want to undo.

## Undo

```bash
kettlemark undo ~/Pictures/Goa
```

Every file goes back to its original name, and the log is removed.

## Next steps

- Change the name format with a [pattern](/docs/reference/configuration/#patterns).
- Rename a whole library at once: [rename a folder of folders](/docs/guides/rename-a-library/).
