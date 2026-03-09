PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT '"2026-03-09T22:51:25.789Z"' NOT NULL,
	`updated_at` integer,
	`deleted_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_budgets`("id", "type", "description", "created_at", "updated_at", "deleted_at") SELECT "id", "type", "description", "created_at", "updated_at", "deleted_at" FROM `budgets`;--> statement-breakpoint
DROP TABLE `budgets`;--> statement-breakpoint
ALTER TABLE `__new_budgets` RENAME TO `budgets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `settings` ADD `monthly_income` integer NOT NULL;