new Vue({
    el: '#app',
    data: {
        showControls: false,
        showStart: true, 
        playerHealth: 100,
        monsterHealth: 100, 
        lives: 3, 
        playerBarColor: 'green',
        monsterBarColor: 'green',
        blow: []
    }, 
    methods: {
        show() {
            this.showControls = true;
            this.showStart = false;
        }, 
        reset() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.showControls = false;
            this.showStart = true;
            this.lives = 3;
            this.playerBarColor = 'green';
            this.monsterBarColor = 'green';
            this.blow = [];

            // let healButton = document.getElementById('heal');
            // healButton.removeAttribute('disabled');
        },
        randomAttack() {
            let damage = Math.floor(Math.random() * (5 - 1) + 1) + 1;
            return damage;
        },
        randomSpecialAttack() {
            let damage = Math.floor(Math.random() * (13 - 6) + 1) + 6;
            return damage;
        },
        attack() {
            this.playerHealth -= 3;
            this.blow.unshift({
                player: 3,
                monster: this.randomAttack()
            });
            this.monsterHealth -= this.randomAttack();
        },
        specialAttack() {
            this.playerHealth -= 11;
            this.blow.unshift({
                player: 11,
                monster: this.randomSpecialAttack()
            });
            this.monsterHealth -= this.randomSpecialAttack();
        }, 
        heal() {
            if (this.playerHealth == 100) {
                alert('You already have full health');
            }
            else {
                let addPhealth = Math.floor(Math.random() * (35 - 20) + 1) + 20;
                let addMhealth = Math.floor(Math.random() * (40 - 25) + 1) + 20;

                this.playerHealth += addPhealth;
                if (this.playerHealth > 100) {
                    this.playerHealth = 100;
                }

                this.monsterHealth += addMhealth;
                if (this.monsterHealth > 100) {
                    this.monsterHealth = 100;
                }

                this.lives -= 1;
            }
        },
        giveUp() {
            this.reset();
            alert('You lose!');
        }
        // changeBarColor(bar, health) {
        //     if (health <= 50) {
        //         let warning = 'orange';
        //         bar = warning;
        //         if (health <= 20) {
        //             let danger = 'red';
        //             bar = danger;
        //             if (health <= 0) {
        //                 health = 0;
        //                 alert('You have lost');
        //                 this.reset();
        //             }
        //         }
        //     }
        // }
    }, 
    computed: {
        playerBar() {
            return {
                width: this.playerHealth + '%',
                backgroundColor: this.playerBarColor
            }
        },
        monsterBar() {
            return {
                width: this.monsterHealth + '%',
                backgroundColor: this.monsterBarColor
            }
        }
    },
    watch: {
        playerHealth: function() {
            // this.changeBarColor(this.playerBarColor, this.playerHealth)
            if (this.playerHealth <= 50) {
                let warning = 'orange';
                this.playerBarColor = warning;
                if (this.playerHealth <= 20) {
                    let danger = 'red';
                    this.playerBarColor = danger;
                    if (this.playerHealth <= 0) {
                        this.playerHealth = 0;
                        alert('You have lost');
                        this.reset();
                    }
                }
            }
        }, 
        monsterHealth: function() {
            if (this.monsterHealth <= 50) {
                let warning = 'orange';
                this.monsterBarColor = warning;
                if (this.monsterHealth <= 20) {
                    let danger = 'red';
                    this.monsterBarColor = danger;
                    if (this.monsterHealth <= 0) {
                        this.monsterHealth = 0;
                        alert('Hurray, you have defeated the monster!');
                        this.reset();
                    }
                }
            }
        }, 
        lives: function() {
            let healButton = document.getElementById('heal');
            if(this.lives == 0) {
                healButton.setAttribute('disabled', true);
            }
            else {
                healButton.removeAttribute('disabled');
            }
        }
    }
})