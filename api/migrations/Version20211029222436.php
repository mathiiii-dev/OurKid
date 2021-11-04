<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211029222436 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE actuality (id INT AUTO_INCREMENT NOT NULL, post LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE calendar (id INT AUTO_INCREMENT NOT NULL, kid_id INT NOT NULL, day DATE NOT NULL, arrival TIME NOT NULL, departure TIME NOT NULL, INDEX IDX_6EA9A1466A973770 (kid_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE daily_resume (id INT AUTO_INCREMENT NOT NULL, kid_id INT DEFAULT NULL, resume LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_E1FFE70C6A973770 (kid_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE kid (id INT AUTO_INCREMENT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, birthday DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE kid_user (kid_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_737C76B16A973770 (kid_id), INDEX IDX_737C76B1A76ED395 (user_id), PRIMARY KEY(kid_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE photo (id INT AUTO_INCREMENT NOT NULL, actuality_id INT DEFAULT NULL, url VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_14B78418B84BD854 (actuality_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE calendar ADD CONSTRAINT FK_6EA9A1466A973770 FOREIGN KEY (kid_id) REFERENCES kid (id)');
        $this->addSql('ALTER TABLE daily_resume ADD CONSTRAINT FK_E1FFE70C6A973770 FOREIGN KEY (kid_id) REFERENCES kid (id)');
        $this->addSql('ALTER TABLE kid_user ADD CONSTRAINT FK_737C76B16A973770 FOREIGN KEY (kid_id) REFERENCES kid (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE kid_user ADD CONSTRAINT FK_737C76B1A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE photo ADD CONSTRAINT FK_14B78418B84BD854 FOREIGN KEY (actuality_id) REFERENCES actuality (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE photo DROP FOREIGN KEY FK_14B78418B84BD854');
        $this->addSql('ALTER TABLE calendar DROP FOREIGN KEY FK_6EA9A1466A973770');
        $this->addSql('ALTER TABLE daily_resume DROP FOREIGN KEY FK_E1FFE70C6A973770');
        $this->addSql('ALTER TABLE kid_user DROP FOREIGN KEY FK_737C76B16A973770');
        $this->addSql('ALTER TABLE kid_user DROP FOREIGN KEY FK_737C76B1A76ED395');
        $this->addSql('DROP TABLE actuality');
        $this->addSql('DROP TABLE calendar');
        $this->addSql('DROP TABLE daily_resume');
        $this->addSql('DROP TABLE kid');
        $this->addSql('DROP TABLE kid_user');
        $this->addSql('DROP TABLE photo');
        $this->addSql('DROP TABLE `user`');
    }
}
