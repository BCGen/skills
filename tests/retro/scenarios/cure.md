# Transcript: a recorded problem recurs and this fix cures it

User: The invoice page shows UTC timestamps again — convert them like
everywhere else.

Assistant: Fixed — the invoice page now converts API dates from UTC before
display, matching the existing rule.

User: Good. And I've now added an ESLint rule that bans rendering raw API
date fields, so this can never regress. This problem is fully solved — no
more adjustment needed. Run the retrospective; I confirm it's cured.
