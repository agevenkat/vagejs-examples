---
title: Commands
description: Every Kettlemark command and option, with examples.
order: 1
---

# Commands

Every command takes a folder. Options can also be set in `kettlemark.toml`; options on the command line win.

## preview

```bash
kettlemark preview <folder> [options]
```

Shows the new name for every file. Changes nothing.

## rename

```bash
kettlemark rename <folder> [options]
```

Renames the files shown by `preview` and writes `.kettlemark-log.json` in each folder it changes.

## undo

```bash
kettlemark undo <folder> [--recursive]
```

Puts files back to the names recorded in the log, then removes the log.

## config

```bash
kettlemark config <folder>
```

Prints the settings Kettlemark would use for that folder, and where each one came from (built-in default, your user settings, the folder's `kettlemark.toml`, or the command line).

## Options

| Option | What it does | Default |
| --- | --- | --- |
| `--pattern <text>` | The new name, built from [pattern tokens](/docs/reference/configuration/#patterns) | `{yyyy}-{mm}-{dd}_{hh}{mi}{ss}` |
| `--recursive` | Include every folder inside | off |
| `--fallback <skip, modified, filename>` | What to do with files that have no date taken | `skip` |
| `--include <globs>` | Only these files, comma-separated | photos and videos |
| `--exclude <globs>` | Leave these out, comma-separated | none |
| `--timezone <zone>` | Time zone for files that store none, like `Asia/Kolkata` | your computer's |
| `--quiet` | Print only the summary | off |
