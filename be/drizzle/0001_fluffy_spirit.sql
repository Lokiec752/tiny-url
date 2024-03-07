CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`valid` integer,
	`created_at` text,
	`updated_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
