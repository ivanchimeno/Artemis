package ${packageName}

import kotlin.random.Random

object Client {

    fun createIntegerArray(size: Int = 30): Array<Int> {
        return Array(size) { Random.nextInt(0, 100) }
    }

    fun scrambleArray(array: Array<Int>): Array<Int> {
        return array.toList().shuffled().toTypedArray()
    }

    fun printIntegerArray(a: Array<Int>) {
        println(a.joinToString(prefix = "[", postfix = "]"))
    }

    fun simulateRuntimeConfigurationChange(sortPolicy: Policy) {
        if (Random.nextBoolean()) {
            println("Time is important!")
            //TODO: configure policy
            /*<remove>*/
            sortPolicy.configure(timeIsImportant = true, spaceIsImportant = false)
            /*</remove>*/
        } else {
            println("Time and space are important!")
            //TODO: configure policy
            /*<remove>*/
            sortPolicy.configure(timeIsImportant = true, spaceIsImportant = true)
            /*</remove>*/
        }
    }

}
