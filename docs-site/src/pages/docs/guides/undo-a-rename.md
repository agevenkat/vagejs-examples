---
title: Undo or fix a rename
description: Put files back to their original names with Kettlemark's undo, or fix a few names by hand without breaking the log.
navTitle: Undo or fix a rename
order: 3
---

# Undo or fix a rename

Every rename writes `.kettlemark-log.json` in the folder. Kettlemark uses it to put names back.

## Undo the last rename

```bash
kettlemark undo ~/Pictures/Goa
```

With `--recursive`, it undoes every folder inside too:

```bash
kettlemark undo ~/Pictures --recursive
```

## If you renamed some files by hand

If you changed a few names yourself after Kettlemark ran, `undo` still works for the others. It skips any file it can't find under the name it gave it, and tells you which:

```
1,839 files restored.
3 not found (renamed or moved since): see the list above.
```

## If you deleted the log

Without the log, Kettlemark can't know the old names. Restore the folder from a backup, or keep the new names. This is why the log stays in the folder until you undo.
