---
title: Photos without a date
description: What Kettlemark does with screenshots, scans and chat-app photos that have no date taken, and how to choose a fallback.
navTitle: Photos without a date
order: 2
---

# Photos without a date

Some files don't record when they were taken. Screenshots, scanned prints, and photos saved from chat apps often lose that information. Kettlemark skips them by default, so it never guesses wrong.

## Choose a fallback

The `--fallback` option decides what happens to these files:

| Value | What happens |
| --- | --- |
| `skip` | Leave the file as it is. This is the default. |
| `modified` | Use the date the file was last changed on disk. |
| `filename` | Look for a date in the current name, like `Screenshot 2026-03-14 at 09.15.22.png`. |

For example:

```bash
kettlemark preview ~/Pictures/Screenshots --fallback filename
```

> The modified date is often the day you copied the file, not the day you took the photo. Preview carefully before you rename with `--fallback modified`.

## Set it once

To use the same fallback every time for a folder, add it to `kettlemark.toml` in that folder:

```toml
fallback = "filename"
```

See the [configuration reference](/docs/reference/configuration/) for every setting.
