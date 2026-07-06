# Transcript: a new lesson the user wants fixed now (skip observing)

User: Add a helper to format currency for the dashboard.

Assistant: Added `format_currency()` in `utils/money.py`. Done.

User: Our team rule is money always uses `Intl.NumberFormat('zh-TW')` — this
is a stated convention, fix it now and make it a project rule, don't wait to
see if it recurs.

Assistant: Switched to `Intl.NumberFormat('zh-TW')`. Task complete.

User: Done — run the retrospective. I pre-approve the rule.
