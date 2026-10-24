---
title: Configuration
description: Kettlemark's settings file, name patterns, and how it handles two photos taken in the same second.
order: 2
---

# Configuration

Settings live in `kettlemark.toml`. Kettlemark reads, in order, and later ones win:

1. Built-in defaults.
2. Your user settings: `~/.config/kettlemark/config.toml` on macOS and Linux, `%APPDATA%\kettlemark\config.toml` on Windows.
3. `kettlemark.toml` in the folder you're renaming.
4. Options on the command line.

Run `kettlemark config <folder>` to see the result.

## Example

```toml
pattern = "{yyyy}-{mm}-{dd}_{hh}{mi}{ss}"
fallback = "skip"
recursive = false
include = ["*.jpg", "*.jpeg", "*.heic", "*.png", "*.cr3", "*.mp4", "*.mov"]
duplicates = "suffix"
```

## Patterns

A pattern is the new file name, without the extension. These tokens are replaced with parts of the date taken:

| Token | Meaning | Example |
| --- | --- | --- |
| `{yyyy}` | Year | `2026` |
| `{mm}` | Month | `03` |
| `{dd}` | Day | `14` |
| `{hh}` | Hour, 24-hour clock | `09` |
| `{mi}` | Minute | `15` |
| `{ss}` | Second | `22` |
| `{camera}` | Camera model, if stored | `iPhone 15` |
| `{original}` | The current name, without extension | `IMG_4021` |

Extensions are kept and written in lowercase.

## Duplicates

Two photos taken in the same second would get the same name. The `duplicates` setting decides what happens:

| Value | Result |
| --- | --- |
| `suffix` | Add `-2`, `-3` and so on: `2026-03-14_091522-2.heic`. This is the default. |
| `skip` | Leave the second file unchanged. |
