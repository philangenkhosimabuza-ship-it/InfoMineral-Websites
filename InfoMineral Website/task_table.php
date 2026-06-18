<?php
public function up()
{
    Schema::create('tasks', function (Blueprint $table) {
        $table->id();
        $table->string('status'); // cleaned, pending, error
        $table->timestamps();
    });
}
?>