<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Joke Stats
          </v-card-title>

          <v-card-body>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Score</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total</td>
                  <td>{{ 123 }}</td>
                </tr>
                <tr>
                  <td>Highest</td>
                  <td>{{ 123 }}</td>
                </tr>
                <tr>
                  <td>Lowest</td>
                  <td>{{ 123 }}</td>
                </tr>
                <tr>
                  <td>Maximum</td>
                  <td>{{ 123 }}</td>
                </tr>
                <tr>
                  <td>Minimum</td>
                  <td>{{ 123 }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-body>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Stats'
}
</script>

<style>

</style>
