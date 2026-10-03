import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1790669643404 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  CREATE TABLE "users" (
    "id" uuid PRIMARY KEY,
    "email" text NOT NULL,
    "email_normalized" text NOT NULL,
    "display_name" text NOT NULL,
    "password_hash" text NOT NULL,
    "role" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_users_email_normalized" UNIQUE ("email_normalized"),
    CONSTRAINT "CHK_users_display_name_length"
      CHECK (char_length("display_name") BETWEEN 1 AND 80),
    CONSTRAINT "CHK_users_role"
      CHECK ("role" IN ('admin', 'user'))
  )
`);

    await queryRunner.query(`
  CREATE TABLE "invite_tokens" (
    "id" uuid PRIMARY KEY,
    "token_hash" text NOT NULL,
    "expires_at" timestamptz NOT NULL,
    "used_at" timestamptz,
    "used_by_user_id" uuid,
    "created_by_admin_id" uuid NOT NULL,
    "revoked_at" timestamptz,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_invite_tokens_token_hash" UNIQUE ("token_hash"),
    CONSTRAINT "FK_invite_tokens_created_by_admin_id"
      FOREIGN KEY ("created_by_admin_id") REFERENCES "users"("id") ON DELETE RESTRICT,
    CONSTRAINT "FK_invite_tokens_used_by_user_id"
      FOREIGN KEY ("used_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT,
    CONSTRAINT "CHK_invite_tokens_usage_pair"
      CHECK (("used_at" IS NULL) = ("used_by_user_id" IS NULL))
  )
`);

    await queryRunner.query(`
  CREATE TABLE "translations" (
    "id" uuid PRIMARY KEY,
    "user_id" uuid NOT NULL,
    "input_text" text NOT NULL,
    "translated_text" text NOT NULL,
    "grammar_explanation" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "FK_translations_user_id"
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT,
    CONSTRAINT "CHK_translations_input_text_length"
      CHECK (char_length("input_text") BETWEEN 1 AND 1000)
  )
`);

    await queryRunner.query(`
  CREATE INDEX "IDX_translations_user_id_created_at"
  ON "translations" ("user_id", "created_at" DESC)
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "translations"`);
    await queryRunner.query(`DROP TABLE "invite_tokens"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }

}
