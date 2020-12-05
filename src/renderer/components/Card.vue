<template>
    <div class="cardWrapper">
        <div v-if="isProfile" class="cardProfile">
            <div class="cardProfileHead">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${selectedMatchup}.png`" class="profileIcon"/>
                <h3 class="cardProfileHeadline">{{ headline }}</h3>
                <p>{{ championData.data[selectedMatchup].title }}</p>
            </div>
            <div class="cardProfileFooter">
                <div class="cardProfileInfo">
                    <font-awesome-icon :icon="icon.edit" size="1x" />
                    <p>{{ latestModifyData }}</p>
                </div>
            </div>
        </div>
        <div :class="isNote ? 'card isNote' : 'card'" v-else>
            <h3>{{ headline }}</h3>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Matchup } from "../store/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FileUtil } from "../utils/FileUtil";

export default Vue.extend({
    name: "card",
    components: { FontAwesomeIcon },
    props: ["headline", "isProfile", "isNote"],
    data() {
        return {
            icon: { edit: faPen }
        };
    },
    computed: {
        selectedMatchup(): string {
			return this.$store.state.Matchup.selectedMatchup;
        },
        championData(): Matchup.IChampionData {
            return this.$store.state.Matchup.championData;   
        },
        latestModifyData(): string {
            return FileUtil.getLatestModifyDate(this.selectedMatchup).format('LL');
        }
    }
});
</script>

<style lang="scss" scoped>
.cardWrapper {
    height: 100%;

    >.card {
        color: #393C40;
        padding: 30px;
        background: white;

        &.isNote {
            height: calc(330px - 60px);
        }
    }

    >.cardProfile {
        background: white;

        >.cardProfileHead {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 30px;

            >.profileIcon {
                border-radius: 100px;
            }

                >h3 {
                margin-bottom: 20px;

                &.cardProfileHeadline {
                    margin: 20px 0px 10px 0px;
                }
            }
        }

        >.cardProfileFooter {
            background: #FCFCFC;
            border-top: 1px solid #ECEDEF;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 30px 0;
            color: #AAAEB3;

            >.cardProfileInfo {
                display: flex;
                flex-direction: row;
                font-size: 10px;
                align-items: center;

                >p {
                    font-size: 12px !important;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>