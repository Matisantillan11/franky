CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
ALTER TABLE `transactions` ADD `budget_id` text REFERENCES budgets(id);