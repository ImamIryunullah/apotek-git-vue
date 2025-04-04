<template>
    <div>
        <FilterObat />
    </div>
    <div>
        <TableObatPseudo />
    </div>
</template>

<script>
import TableObatPseudo from '@/components/TableObatPseudo.vue';
import FilterObat from '@/components/FilterObat.vue';

export default {
    components: {
        TableObatPseudo,
        FilterObat
    }
}
</script>