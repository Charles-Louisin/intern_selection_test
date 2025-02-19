function twoSum(nums, target) {
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];

        if (map.has(complement)) {
            let index1 = map.get(complement);
            let index2 = i;
            console.log(`[${index1} & ${index2}] parce que nums[${index1}] + nums[${index2}] == ${target}`);
            return [index1, index2];
        }

        map.set(nums[i], i);
    }

    return [];
}


twoSum([16, 5, 35, 35], 70);